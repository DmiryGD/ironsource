Example scripts for infrastructure, provisioning and autodeploy some simple application

Steps for installation:

1. Clone repository and prepare required variables
2. Enter to Terraform directory and run `terraform apply`
3. Wait until environment will be ready
4. Checkout external IP address of EC2 instance by command `terraform show`
5. Add this external IP address to ansible inventory file `playbook/inventory`
6. Apply playbook: `ansible-playbook mainfile.yaml`

Environment will be ready for deployment, monitoring and Nginx proxy will be configured and ready for interaction.

For enable CI/CD:
1. Get github action runner token
2. login to the host and setup runner
3. start runner
4. Push some commit to repo. The docker container will be automatically created and started on the host.
