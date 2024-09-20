<script>
// @ts-nocheck

    import "../../../../../scss/home.css";
    import "../../../../../scss/admin.css";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { page } from "$app/stores";
    import { onMount } from 'svelte';
    import toast from "svelte-french-toast";
     export let data;
     const {adminData} = data;
    let msg = "";
    let error = false;
    let email = "";
    // console.log("Page data in new-admin:", $page.data.session)
    onMount(() => {
        email = $page.data.session.user.email;
    });

    async function handleCreateAdmin(event) {
        event.preventDefault();
        const form = event.target;

        try {
            const formData = new FormData(form);

            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            const response = await fetch(`${PUBLIC_BACKEND_URL}/create-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData),
                credentials: "include"
            });

            if (response.ok) {
                const result = await response.json();
                error = false;
                msg = result.msg;
                toast.success(msg, {
                    position: 'bottom-center'
                })
            } else {
                const result = await response.json();
                error = true;
                msg = result.msg;
                toast.error(msg, {
                    position: 'bottom-center'
                })
            }
        } catch (err) {
            console.error("Error creating admin", err);
            error = true;
            msg = result.msg
            toast.error(msg, {
                    position: 'bottom-center'
                })
        }
    }
</script>



{#if adminData.role == "developer"}
<div class="new-admin-container">
    <h2>Add new Admin</h2>

    <form on:submit={handleCreateAdmin}>
        <label for="email" class="required">Email</label>
        <input type="email" name="email">
        <br />
        <label for="role" class="required">Type of admin</label>
        <select name="role" id="role">
            <optgroup label="Admin Role" disabled>
                <option selected hidden>Admin Role &nbsp; ↓</option>
            </optgroup>
            <option value="admin">Admin</option>
            <option value="master">Master</option>
            <option value="developer">Developer</option>
        </select>
        <br />
        <label for="valid_till" class="required">Admin Till</label>
        <input type="date" name="valid_till">
        <br />
        <button type="submit">Add</button>
    </form>
</div>
{:else}
<div class="new-admin-container">
    <h2>Add new Admin</h2>

    <form on:submit={handleCreateAdmin}>
        <label for="email">Email</label>
        <input type="email" name="email" required>
        <br />
        <label for="role" hidden>Type of admin</label>
        <select name="role" id="role" hidden value="admin">
            <option value="admin">Admin</option>
        </select>
        <br />
        <label for="valid_till">Admin Till</label>
        <input type="date" name="valid_till" required>
        <br />
        <button type="submit">Add</button>
    </form>
</div>
{/if}

