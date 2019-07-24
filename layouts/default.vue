<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
  body {
    background: no-repeat url('../assets/images/background-480.jpg') fixed center center;
    background-size: cover;
  }

  @media screen and (min-width: 480px) {
    body {
      background: no-repeat url('../assets/images/background-768.jpg') fixed center center;
    } 
  }

  @media screen and (min-width: 768px) {
    body {
      background: no-repeat url('../assets/images/background-1024.jpg') fixed center center;
    } 
  }
  
  @media screen and (min-width: 1024px) {
    body {
      background: no-repeat url('../assets/images/background-1240.jpg') fixed center center;
    } 
  }

  @media screen and (min-width: 1240px) {
    body {
      background: no-repeat url('../assets/images/background-1920.jpg') fixed center center;
    } 
  }

  .tape-heading {
    position: relative;
    z-index: 2;
  }

  .tape-heading:before {
    content: '';
    background: #fff;
    opacity: .85;
    transform: rotate(-3deg);
    position: absolute;
    top: -15px;
    bottom: -15px;
    left: -30px;
    right: -30px;
    z-index: -1;
  }
</style>
