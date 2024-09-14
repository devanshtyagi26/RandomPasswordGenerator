class GeneratePassword {
  constructor(length, isupper, islower, isnum, isspecial) {
    this.length = length;
    this.isupper = isupper;
    this.islower = islower;
    this.isnum = isnum;
    this.isspecial = isspecial;
  }

  #upperset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  #lowerset = "abcdefghijklmnopqrstuvwxyz";
  #numset = "1234567890";
  #specialset = "!@#$%^&";

  build() {
    let choiceSet = "";
    if (this.isupper == 1) {
      choiceSet += this.#upperset;
    }
    if (this.islower == 1) {
      choiceSet += this.#lowerset;
    }
    if (this.isnum == 1) {
      choiceSet += this.#numset;
    }
    if (this.isspecial == 1) {
      choiceSet += this.#specialset;
    }

    let password = "";
    for (let i = 0; i < this.length; i++) {
      const bit = choiceSet[Math.floor(Math.random() * choiceSet.length)];
      password += bit;
    }

    return password;
  }
}

let button = document.querySelector("#submit");

function processForm() {
  const upper = document.querySelector("#upper");
  const lower = document.querySelector("#lower");
  const number = document.querySelector("#number");
  const special = document.querySelector("#special");
  const length = document.querySelector("#length").value;
  if (length > 15) {
    document.querySelector(".password").innerHTML = "";
    alertify.set("notifier", "position", "top-right");
    alertify.error("Length is greater than 15 chars"); // Error callback
    return;
  }
  let isupper;
  let islower;
  let isnumber;
  let isspecial;
  if (upper.checked == true) {
    isupper = 1;
  } else {
    isupper = 0;
  }
  if (lower.checked == true) {
    islower = 1;
  } else {
    islower = 0;
  }
  if (number.checked == true) {
    isnumber = 1;
  } else {
    isnumber = 0;
  }
  if (special.checked == true) {
    isspecial = 1;
  } else {
    isspecial = 0;
  }

  let password = new GeneratePassword(
    length,
    isupper,
    islower,
    isnumber,
    isspecial
  );
  console.log(password.build());
  document.querySelector(".password").innerHTML = password.build();
}
// let text = document.querySelector(".password").innerHTML;
function copyToClipboard() {
  const text = document.querySelector(".password").innerHTML; // The text you want to copy

  navigator.clipboard
    .writeText(text)
    .then(function () {
      alertify.set("notifier", "position", "top-right");
      alertify.success("Password Copied Successfully");
    })
    .catch(function (error) {
      alertify.set("notifier", "position", "top-right");
      alertify.error("Failed to Copy"); // Error callback
    });
}
