import { type SignInData } from '@pages/sign-in/model/types';
import { BaseModel } from '@shared/lib';

const getInitialData = (): SignInData => ({
  login: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
});

export class SignInModel extends BaseModel<SignInData> {
  public data = getInitialData();

  public printValues() {
    console.log(this.data);
  }
}
