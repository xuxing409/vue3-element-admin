<template>
  <div class="navbar">
    <!-- 折叠按钮 -->
    <hamburger />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <header-search class="right-menu-item hover-effect" />
      <screenfull class="right-menu-item hover-effect" />
      <theme-select class="right-menu-item hover-effect" />
      <lang-select class="right-menu-item hover-effect" />

      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            style="background: none"
            shape="square"
            :size="40"
            :src="userInfo.avatar"
          >
          </el-avatar>
          <!-- <i class="el-icon-s-tools"></i> -->
          <el-icon><Tools /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="__blank" href="#">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item @click="logout" divided>
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import appStore from '@/stores'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
const { userInfo } = storeToRefs(appStore.useUserStore)
const { logout } = appStore.useUserStore
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
    ::v-deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    ::v-deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
