<script>
  // @ts-nocheck
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import {page} from "$app/stores"
  import "../../../scss/admin.css";
  import "../../../scss/home.css";
  import toast from "svelte-french-toast";
let jk  = false
  async function handlePasswordReset(event) {
    event.preventDefault();

    const form = event.target;
    let formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());
    if (data["newPassword"] !== data["repeatPassword"]) {
      error = true;
      msg = "Passwords do not match. Please try again.";
      return;
    }
    data.sessionEmail = $page.data.session.user.email;
    try {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/password-reset`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        jk = true
       toast.success(result.msg, {
        position: 'bottom-center'
       })
      } else {
        const result = await response.json();
        toast.error(result.msg, {
        position: 'bottom-center'
       })
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        position: 'bottom-center'
       })
    } 
  }
</script>



<div class="admin-passReset-container">
  <h2>Update Password Page</h2>

  <form class="updatePasswordForm" on:submit={handlePasswordReset}>
    
      <input
        type="password"
        name="newPassword"
        id="new-password"
        placeholder="New Password"
        required
      />
   
 
      <input
        type="password"
        name="repeatPassword"
        id="repeat-password"
        placeholder="Repeat Password"
        required
      />
    
    <button type="submit">Submit</button>
  </form>

  {#if jk}
    <p class="success">Password updated successfully please return to <a href="/admin">Login</a> an signup again</p>
  {/if}

</div>


<style>
  /* .updatePasswordForm {
    max-width: 500px;
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #45a049;
  }

  .success {
    color: green;
    text-align: center;
  } */
</style>
