import { Construct } from 'constructs';
import { App, TerraformStack, Token } from 'cdktf';
import { Vpc } from './.gen/providers/aws/vpc';
import { Subnet } from './.gen/providers/aws/vpc/subnet';
import { AwsProvider } from './.gen/providers/aws'
 
class MyStack extends TerraformStack {
 constructor(scope: Construct, name: string) {
   super(scope, name);
 
   new AwsProvider(this, 'aws', {
     profile: 'clouduser',
     region: 'us-east-1'
   });
 
   const vpc = new Vpc(this, 'my-vpc', {
     cidrBlock: '10.0.0.0/16'
   });
    new Subnet(this, 'my-subnet', {
     vpcId: Token.asString(vpc.id),
     cidrBlock: '10.0.0.0/24'
   });
 }
}
 
const app = new App();
new MyStack(app, 'vpc-example');
app.synth();
