import "./CharityInstitution.css";
import Charity from "../../../../../Assets/Charity.jpeg";
import { Button, Form } from "react-bootstrap";
import {
  getLanguageError,
  getLanguageConstant,
} from "../../../../../Utilities/Helpers";
import { websiteLanguageState } from "../../../../../RecoilResources/Atoms";
import { useRecoilState } from "recoil";
import { useState } from "react";
import * as validator from "../../../../../Utilities/Validators";
import * as _ from "lodash";
import { signUp } from "../../../../../Utilities/Firebase";

const CharityInstitutionForm = function () {
  const [lang] = useRecoilState(websiteLanguageState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [errors, setErrors] = useState({});

  const hasError = (field) => {
    return errors[field];
  };

  const submit = async () => {
    let errorsObj = {};
    if (validator.validateName(name).status == 0) {
      errorsObj.name = getLanguageError(
        lang,
        validator.validateName(name).error
      );
    }
    if (validator.validateEmail(email).status == 0) {
      errorsObj.email = getLanguageError(
        lang,
        validator.validateEmail(email).error
      );
    }
    if (validator.validatePhoneNumber(phone).status == 0) {
      errorsObj.phone = getLanguageError(
        lang,
        validator.validatePhoneNumber(phone).error
      );
    }
    if (validator.validatePassword(password).status == 0) {
      errorsObj.password = getLanguageError(
        lang,
        validator.validatePassword(password).error
      );
    }
    if (!_.isEmpty(errorsObj)) {
      setErrors(errorsObj);
      return;
    }

    let signUpObj = {
      name,
      email,
      password,
      phone,
      fbLink,
      type: 2,
      status: 2,
    };

    await signUp(signUpObj);

  };

  return (
    <div className="volunteer-form charity-form">
    <div className="row ">
      <div className="col-md-2"></div>
      <div className="sign-up-role col-md-4">
        <h1>{getLanguageConstant(lang, "CharityInstitution")}</h1>
      </div>
      <img
        src={Charity}
        className="col-md-2"
        alt="disabled"
      />
    </div>
    <Form className="form-sign-up-labels">
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label size="sm">
          {getLanguageConstant(lang, "Name")}
        </Form.Label>
        <Form.Control
          type="name"
          placeholder={getLanguageConstant(lang, "NamePlaceHolder")}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={hasError("name") ? "error" : ""}
        />
        {hasError("name") && (
          <Form.Text className="text-mute err-message">
            {errors.name}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>{getLanguageConstant(lang, "Email")}</Form.Label>
        <Form.Control
          type="email"
          placeholder={getLanguageConstant(lang, "EmailPlaceHolder")}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={hasError("email") ? "error" : ""}
        />
        {hasError("email") && (
          <Form.Text className="text-mute err-message">
            {errors.email}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>{getLanguageConstant(lang, "Password")}</Form.Label>
        <Form.Control
          type="password"
          placeholder={getLanguageConstant(lang, "PasswordPlaceHolder")}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={hasError("password") ? "error" : ""}
        />
        {hasError("password") && (
          <Form.Text className="text-mute err-message">
            {errors.password}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoneNumber">
        <Form.Label>{getLanguageConstant(lang, "PhoneNumber")}</Form.Label>
        <Form.Control
          type="text"
          placeholder="+201000000000"
          name="phoneNumber"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={hasError("phone") ? "error" : ""}
        />
        {hasError("phone") && (
          <Form.Text className="text-mute err-message">
            {errors.phone}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formReferralCode">
        <Form.Label>{getLanguageConstant(lang, "FbProfileLink")}</Form.Label>
        <Form.Control
          type="link"
          placeholder={getLanguageConstant(lang, "FbPlaceHolder")}
          name="fbLink"
          value={fbLink}
          onChange={(e) => setFbLink(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={submit}>
        Submit
      </Button>
    </Form>
  </div>

  );
};
export default CharityInstitutionForm;
