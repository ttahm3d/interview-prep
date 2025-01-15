const user = {
  fname: "John",
  lname: "Doe",
  fullName: function () {
    console.log(this.fname + " " + this.lname);
  },
};

const newUser = {
  __proto__: user,
};
