const Auth = artifacts.require("RegistrationLogin");

module.exports = function (deployer) {
  deployer.deploy(Auth);
};
