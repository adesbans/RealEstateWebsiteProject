/*
 * This represents the about page.
 *
 * @author Alex Desbans
 */
 /*
 * This represents the about page.
 *
 * @author Alex Desbans
 */
 
<template>
    <div>
        <h2 id="maintenaceheader">Start a Rental Application</h2>
        <div class="container">
            <form @submit.prevent="sendEmailTwo" enctype="multipart/form-data" method="post">
              <label>Name</label>
              <input 
                type="text" 
                v-model="rentalname"
                name="Name"
                placeholder="Your Name"
              >
              <label>Email</label>
              <input 
                type="email" 
                v-model="rentalemail"
                name="Email"
                placeholder="Your Email"
                >
              <label>Phone Number</label>
              <br>
              <br>
              <br>
              <input 
              type="tel" 
              v-model="rentalphonenumber"
              name="Phone Number"
              placeholder="Your Phone Number"
              >
              <br>
              <br>
              <label>In which property are you interested?</label>
              <select name="Rental Property" v-model="rentalproperty">
              <option v-for="(property, i) in data.props" :key="i">{{property.address}}</option>
              </select>

              
              <br>
              <br>
              <label>What is your move in date?</label>
              <br>
              <br>
              <input 
                type="date" 
                v-model="rentalmoveindate"
                name="Move In Date"
              >
              <br>
              <br>
              <label>How many adults plan to move in?</label>
              <br>
              <br>
              <select name="Adults" v-model="rentaladultsnum">
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
              </select>
              <br>
              <br>
              <label>How many children plan to move in?</label>
              <br>
              <br>
              <select name="Adults" v-model="rentalchildrennum">
                <option value="None">None</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
              </select>
              <br>
              <br>
              <label>Do you have any pets?</label>
              <br>
              <br>
              <select name="Pets" v-model="rentalpets">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>What is the approximate combined level of gross income of all tenants?</label>
              <input 
                type="text" 
                v-model="rentalincome"
                name="Income"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>Is anyone a smoker?</label>
              <br>
              <br>
              <select name="Smoker" v-model="rentalsmoker">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Do you have any significant debts or payment amounts to make in addition to the rent?</label>
              <br>
              <br>
              <select name="Debts" v-model="rentaldebts">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Please describe the main payments you have to make:</label>
              <textarea 
                name="Payments"
                v-model="rentalpayments"
                cols="30" rows="5"
                placeholder="Type answer here...">
              </textarea>
              <br>
              <br>
              <label>How would you rate your credit?</label>
              <br>
              <br>
              <select name="Credit" v-model="rentalcredit">
                <option value="Poor">Poor</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
              </select>
              <br>
              <br>
              <label>For how long have you been working in the same field?</label>
              <input 
                type="text" 
                v-model="rentaltimeworking"
                name="Time Working"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>In which industry, position and location do you work?</label>
              <input 
                type="text" 
                v-model="rentalindustry"
                name="Industry"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>What is your employment status?</label>
              <br>
              <br>
              <select name="Employment" v-model="rentalemployment">
                <option value="Hourly">Hourly</option>
                <option value="Salaried">Salaried</option>
                <option value="Self-employed">Self-employed</option>
              </select>
              <br>
              <br>
              <label>What is the reason of your move?</label>
              <input 
                type="text" 
                v-model="rentalreason"
                name="Reason"
                placeholder="Type answer here..."
              >
              <br>
              <br>
              <label>Are you OK with a 12-month lease?</label>
              <br>
              <br>
              <select name="Lease" v-model="rentallease">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Are you OK with a one-month rent equivalent security deposit?</label>
              <br>
              <br>
              <select name="Deposit" v-model="rentaldeposit">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br>
              <br>
              <label>Please provide any extra information or any questions you may have here:</label>
              <textarea 
                name="Extra Info"
                v-model="rentalextrainfo"
                cols="30" rows="5"
                placeholder="Type answer here...">
              </textarea>
              <br>
              <br>
              <input type="submit" value="Send">
            </form>
        </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';
export default {
    name: 'RentalAppPage',
    props: {
        data: {
            type: Object,
            retuired: true,
        },
    },
    data () {
        return {
            rentalname: '',
            rentalemail: '',
            rentalphonenumber: '',
            rentalproperty: '',
            rentalmoveindate: '',
            rentaladultsnum: '',
            rentalchildrennum: '',
            rentalpets: '',
            rentalincome: '',
            rentalsmoker: '',
            rentaldebts: '',
            rentalpayments: '',
            rentalcredit: '',
            rentaltimeworking: '',
            rentalindustry: '',
            rentalemployment: '',
            rentalreason: '',
            rentallease: '',
            rentaldeposit: '',
            rentalextrainfo: '',
        }
    },
    methods: {
        sendEmailTwo(e) {
        try {
            console.log(e.target);
            emailjs.send('service_8es2x27', 'template_2xgnuap',
            {
            rentalname: this.rentalname,
            rentalemail: this.rentalemail,
            rentalphonenumber: this.rentalphonenumber,
            rentalproperty: this.rentalproperty,
            rentalmoveindate: this.rentalmoveindate,
            rentaladultsnum: this.rentaladultsnum,
            rentalchildrennum: this.rentalchildrennum,
            rentalpets: this.rentalpets,
            rentalincome: this.rentalincome,
            rentalsmoker: this.rentalsmoker,
            rentaldebts: this.rentaldebts,
            rentalpayments: this.rentalpayments,
            rentalcredit: this.rentalcredit,
            rentaltimeworking: this.rentaltimeworking,
            rentalindustry: this.rentalindustry,
            rentalemployment: this.rentalemployment,
            rentalreason: this.rentalreason,
            rentallease: this.rentallease,
            rentaldeposit: this.rentaldeposit,
            rentalextrainfo: this.rentalextrainfo
            }, 'user_hidok5i1A3U4Zo51VAvnj')

        } catch(error) {
            console.log({error})
        }
        // Reset form field
            this.rentalname = '';
            this.rentalemail = '';
            this.rentalphonenumber = '';
            this.rentalproperty = '';
            this.rentalmoveindate = '';
            this.rentaladultsnum = '';
            this.rentalchildrennum = '';
            this.rentalpets = '';
            this.rentalincome = '';
            this.rentalsmoker = '';
            this.rentaldebts = '';
            this.rentalpayments = '';
            this.rentalcredit = '';
            this.rentaltimeworking = '';
            this.rentalindustry = '';
            this.rentalemployment = '';
            this.rentalreason = '';
            this.rentallease = '';
            this.rentaldeposit = '';
            this.rentalextrainfo  = '';
        
        },
    }
}
</script>

<style scoped>
#maintenaceheader {
  margin-left: 25px;
}
input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.container {
  display: block;
  margin: 25px;
  border-radius: 5px;
  background-color: #f1d8ca;
  padding: 20px;
  width: 50%;
}
</style>
