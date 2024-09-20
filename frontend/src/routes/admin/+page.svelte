<script>
    // @ts-nocheck
  
    import "../../scss/home.css";
    import "../../scss/admin.css";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { goto } from "$app/navigation";
    import {page} from "$app/stores"
    // export let data;
    let error = false;
    let msg = "";
  
    async function handleSubmit(event) {
      event.preventDefault();
  
      const form = event.target;
      let formData = new FormData(form);
      let data = Object.fromEntries(formData.entries());
      // console.log(`email: ${data.email}, Password: ${data.password}`);
  
      try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/adminLogin`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (result.error) {
          error = result.error;
          msg = result.msg;
        } else {
          goto("/admin/dashboard");
        }
      } catch (e) {
        error = true;
        msg = "An error occurred. Please try again.";
      }
    }
  </script>
  
  <div class="admin-auth-container">
    <h2 class="title">Admin Login</h2>
    <form on:submit={handleSubmit}>
      <label for="email" class="required">Email id</label>
      <input
        type="email"
        name="email"
        bind:value={$page.data.session.user.email}
        placeholder="email@paruluniversity.ac.in"
        readonly
        required
      />
      <label for="password" class="required">Password</label>
      <input type="password" name="password" placeholder="password" required />
      <button type="submit">Login</button>
    </form>
    <p class="error-msg">{msg}</p>

    <a href="/admin/admin-passReset">Forgot Password?</a>
  </div>
  