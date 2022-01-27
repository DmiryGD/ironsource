terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

resource "aws_security_group" "app_sg" {
  name        = "allow_api_grafana"
  description = "Allow API inbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    description      = "API from Internet"
    from_port        = 0
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = [ "0.0.0.0/0" ]
    ipv6_cidr_blocks = ["::/0"]
  }

  ingress {
    description      = "Grafana from Internet"
    from_port        = 0
    to_port          = 3000
    protocol         = "tcp"
    cidr_blocks      = [ "0.0.0.0/0" ]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name = "allow_app"
  }
}

resource "aws_instance" "app_server" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  subnet_id     = var.subnet_id
  associate_public_ip_address = true
  security_groups = [ "sg-0af5b83fb3a7440ac", aws_security_group.app_sg.id ]
  key_name        = var.key_name

  tags = {
    Name = "AppServerInstance"
  }
}

resource "aws_elasticache_subnet_group" "redis-subnets" {
  name       = "redis-subnets"
  subnet_ids = [ var.subnet_id ]
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "cluster"
  engine               = "redis"
  node_type            = "cache.m4.large"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis3.2"
  engine_version       = "3.2.10"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.redis-subnets.name
}
