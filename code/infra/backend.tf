terraform {
  backend "s3" {
    bucket       = "easyrent-tf-state-prod"
    key          = "eks/terraform.tfstate"
    region       = "ap-south-1"
    use_lockfile = true
    encrypt      = true
  }
}