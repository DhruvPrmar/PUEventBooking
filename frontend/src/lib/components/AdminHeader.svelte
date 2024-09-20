<script>
// @ts-nocheck

import "../../scss/adminHeader.css";
import { page } from "$app/stores";

export let data;
// console.log("AdminHeader.svelte data: ", data)
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
</script>

<div class="admin-header-container">
    <div class="admin-header-contents">
        <div class="img-container">
            <img src={$page?.data?.session?.user?.image} alt="Profile">
        </div>
        <div class="nameNrole">
            <h3 class="name">
                {$page?.data?.session?.user?.name}
                <!-- Mohammad Abdulah Iqbal Hussain Akbar Quadri -->
            </h3>
            <!-- <p>{data?.adminData?.email}</p> -->
            <p class="role">{capitalize(data?.adminData?.role)}</p>
        </div>
    </div>

</div>
<hr class="bottom-line">