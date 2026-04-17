resource "aws_instance" "jenkins" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  key_name = "new_one"
  associate_public_ip_address = true
  user_data              = file("${path.module}/user_data.sh")

  tags = {
    Name = "jenkins-server"
  }
}