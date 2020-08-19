<template>
  <div class="card" style="width: 18rem; padding-bottom:20px; margin-top:20px">
    <div class="mydetailheader">
      <p style="font-size:20px; font-weight:bold;">Detail</p>
      <div class="deletebutton">
        <i class="fa fa-trash fa-2x"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product'
}
</script>

<style>
.myinput {
  border: 0 ;
  /* border-bottom: 2px solid #fff; */
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #333;
  color: aliceblue;
  text-align: center;
}
.deletebutton {
  padding-top:10px;
  padding-left:10px;
  padding-right:10px;
  color:white;
  cursor:pointer;
}
.deletebutton:hover {
  color:red;
}
</style>
