terraform {
  required_version = ">= 1.6.0"
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project     = "EASYRENT"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}