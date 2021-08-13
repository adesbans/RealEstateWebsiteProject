/*
 * This represents a a maintenance page component.
 *
 * @author Alex Desbans
 */

<template>
    <div>
        <h2 id="maintenaceheader">Send us a Maintenance Request</h2>
        <div class="container">
            <form @submit.prevent="sendEmail" enctype="multipart/form-data" method="post">
              <label>Name</label>
              <input 
                type="text" 
                v-model="name"
                name="Name"
                placeholder="Your Name"
              >
              <label>Email</label>
              <input 
                type="email" 
                v-model="email"
                name="Email"
                placeholder="Your Email"
                >
              <label>Phone Number</label>
              <br>
              <br>
              <br>
              <input 
                type="tel" 
                v-model="phonenumber"
                name="Phone Number"
                placeholder="Your Phone Number"
                >
                <br>
                <br>
                <label>Address</label>
              <input 
                type="text" 
                v-model="address"
                name="Address"
                placeholder="Your Address"
                >
              <label>Issue Description</label>
              <textarea 
                name="Issue Description"
                v-model="message"
                cols="30" rows="5"
                placeholder="Message">
              </textarea>
              <label for="choices">Priority Level:</label>
              <br>
              <br>
              <br>
              <select name="Priority" id="choices" v-model="priority">
                <option value="Immediate">Immediate</option>
                <option value="Same Day">Same Day</option>
                <option value="Next Day">Next Day</option>
              </select>
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
    name: 'MaintenancePage',
    data () {
        return {
            name: '',
            email: '',
            message: '',
            phonenumber: '',
            address: '',
            priority: '',
        }
    },
    methods: {
        sendEmail(e) {
            try {
                console.log(e.target);
                emailjs.send('service_8es2x27', 'template_nkenr12',
                {
                name: this.name,
                email: this.email,
                message: this.message,
                address: this.address, 
                priority: this.priority,
                phonenumber: this.phonenumber,
                }, 'user_hidok5i1A3U4Zo51VAvnj')

            } catch(error) {
                console.log({error})
            }
            // Reset form field
            this.name = ''
            this.email = ''
            this.message = ''
            this.address = ''
            this.priority = ''
            this.phonenumber = ''
            },
    }
    
}
</script>

<style scoped>
#maintenaceheader {
  margin-left: 25px;
}
.container {
  display: block;
  margin: 25px;
  border-radius: 5px;
  background-color: #f1d8ca;
  padding: 20px;
  width: 50%;
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
</style>
