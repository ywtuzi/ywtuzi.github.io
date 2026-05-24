<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="admin-layout">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Noto Sans SC', system-ui, sans-serif;
  background: #0f1923;
  color: #e8e4d9;
}
.admin-layout { display: flex; min-height: 100vh; }
.main-content { flex: 1; padding: 24px; overflow-y: auto; }
input, textarea, select {
  background: #1a2a3a; border: 1px solid #2a3a4a;
  color: #e8e4d9; padding: 8px 12px; border-radius: 4px;
  font-size: 14px; width: 100%;
}
input:focus, textarea:focus { outline: none; border-color: #2d8a4e; }
button {
  padding: 8px 20px; border: none; border-radius: 4px;
  cursor: pointer; font-size: 14px; transition: all 0.3s;
}
.btn-primary { background: #2d8a4e; color: #fff; }
.btn-primary:hover { background: #3aa85e; }
.btn-danger { background: #c43a31; color: #fff; }
.btn-danger:hover { background: #d94a41; }
</style>
