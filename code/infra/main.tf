module "vpc" {
  source   = "./modules/vpc"
  vpc_cidr = "10.0.0.0/16"
  azs      = ["ap-south-1a", "ap-south-1b"]
}

module "eks" {
  source             = "./modules/eks"
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.public_subnet_ids
}

module "ec2" {
  source        = "./modules/ec2"
  ami_id        = "ami-0e12ffc2dd465f6e4"
  instance_type = "t3.medium"
  subnet_id     = module.vpc.public_subnet_ids[0]
}