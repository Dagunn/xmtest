

$(document).ready(function () {
  $('.slider').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [

      {
        breakpoint: 1058,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },

      {
        breakpoint: 890,
        settings: {
          slidesToShow: 3,
        }
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
});
let result = [];

function isRightSymbol({symbol}) {
  return symbol == "BTC" || symbol == "ETH" || symbol == "XRP" || symbol == "LTC" || symbol == "BCH";
}



fetch("https://api.coinlore.net/api/tickers/")
  .then((response) => response.json())
  .then((data) =>{
    result = data.data.filter(isRightSymbol)
    fillWrap();
  });

 function fillWrap(){
  let resultLayout = '';
    let changeClass = "up";
      result.forEach (element =>{
      if(element.percent_change_24h < 0) {
        changeClass = "down";
      }
      resultLayout += ` 
        <div class="crypto__box grid">
          <div class="flex crypto__info">
              <svg width="34" height="34">
                  <use xlink:href="images/svg-sprite/icons.svg#${element.symbol.toLowerCase()}"></use>
              </svg>
              <p class="crypto__symbol textUp"><small>${element.symbol}</small></p>
              <p class="crypto__title textUp">${element.name}</p>
          </div>
          
          <p class="crypto__price">$ ${element.price_usd}</p>
              <small class="crypto__percents crypto__percents--${changeClass}">
              <i class="fa fa-chevron-circle-${changeClass}" aria-hidden="true"></i>
              ${element.percent_change_24h}
          </small>
      </div>
      `
      document.querySelector('.js-crypto').innerHTML = resultLayout;
  });
 }
  
 
const initForm = {
  formItems:  {
    form: document.querySelector('#form'),
    email: document.querySelector('.js-form__email'),
    password: document.querySelector('.js-form__password'),
    submitBtn: document.querySelector('.js-register__btn'),
    successBox: document.querySelector('.js-success'),
    controlEmail: document.querySelector('.js-form__control-email'),
    controlLength: document.querySelector('.js-register__length'),
    controlDigit: document.querySelector('.js-register__digit'),
    controlLower: document.querySelector('.js-register__lower'),
    controlUpper: document.querySelector('.js-register__upper'),
    controlSpecial: document.querySelector('.js-register__special'),
  },

  validOk:  {
   email : false,
   password: false
  },

  initValidation: function() {
    this.formItems.email.addEventListener('input',this.processEmail.bind(initForm));
    this.formItems.password.addEventListener('input', this.processPassword.bind(initForm));
  },

  processEmail: function (event) {
    let value = event.target.value;

    if(this.validateEmail(value)) {
      this.validOk.email = true
      this.emailStyleControl(true, value);
      if(this.validOk.password) {
        this.unlockBtn()
      }
    } else {
      this.validOk.email = false;
      this.lockBtn();
      this.emailStyleControl(false, value);
    }
  },

  processPassword: function(event) {
    let value = event.target.value;

    let allControlsValid = false;
    let validStateCount = 0;

    let controlsValidState = this.validatePassword(value);
    Object.values(controlsValidState).forEach( ({state}) => {
      if(state) {
        validStateCount++;
      } else {
        validStateCount--;
      }
      if(validStateCount == Object.values(controlsValidState).length) {
        allControlsValid = true;
      }
    });

    if(allControlsValid) {
      this.validOk.password = true;
      if(this.validOk.email) {
        this.unlockBtn();
      }
    } else {
      this.validOk.password = false;
      this.lockBtn();
    }

    this.stateStyleControl(controlsValidState);
  },

  validatePassword: function(value) {
    const controlsValidState = {
      valueLength: {
        state: false,
        selector: this.formItems.controlLength
      },
      uppercase: {
        state: false,
        selector: this.formItems.controlUpper
      },
      lowercase: {
        state: false,
        selector: this.formItems.controlLower
      },
      digit: {
        state: false,
        selector: this.formItems.controlDigit
      },
      specialChars: {
        state: false,
        selector: this.formItems.controlSpecial
      }
    }
    controlsValidState.valueLength.state = /^.{8,15}$/.test(value);
    controlsValidState.uppercase.state = /[A-Z]/.test(value);
    controlsValidState.lowercase.state = /[a-z]/.test(value);
    controlsValidState.digit.state = /\d/.test(value);
    controlsValidState.specialChars.state =  /[#\[\]()@$&*!?|,.^/\\+_\-]/.test(value);

    return controlsValidState;
  },

  stateStyleControl: function(state) {
    Object.values(state).forEach((elem) => {
      if(elem.state) {
        elem.selector.classList.add('greenTxt')
        elem.selector.classList.remove('redTxt')
      } else {
        elem.selector.classList.add('redTxt')
        elem.selector.classList.remove('greenTxt')
      }
    });
  },

  emailStyleControl: function(isValid, value) {
    if(isValid) {
      this.formItems.email.classList.add('borderGreen')
      this.formItems.email.classList.remove('borderRed')
      if(!this.formItems.controlEmail.classList.contains('hidden')) {
        this.formItems.controlEmail.classList.add('hidden')
      }
    } else {
      this.formItems.email.classList.add('borderRed');
      this.formItems.email.classList.remove('borderGreen');
      if(this.formItems.controlEmail.classList.contains('hidden')){
        this.formItems.controlEmail.classList.remove('hidden');
      } else if (!value) {
        this.formItems.controlEmail.classList.add('hidden');
      }
    }
  },

  validateEmail: function(value){
    let emailRegExp = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    return emailRegExp.test(value);
  },

  unlockBtn: function() {
    this.submitForm();
    this.formItems.submitBtn.classList.remove('disabled');
    this.formItems.submitBtn.removeAttribute('disabled');
  },

  lockBtn: function() {
    this.formItems.submitBtn.setAttribute('disabled', '');
    this.formItems.submitBtn.classList.add('disabled');
  },

  submitForm: function() {
    this.formItems.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const response = await fetch('./form_process.php', {
        method: 'POST',
        body: new FormData(this.formItems.form)
      });
      const result = await response.text();
      if(result == 'success') {
        this.formItems.form.submit();

        setTimeout(() => {
          this.formItems.successBox.classList.remove('hidden')
        }, 1000)
          setTimeout(() => {
            this.formItems.successBox.classList.add('hidden')
          }, 10000)
        }
    });
  }
}

initForm.initValidation();
