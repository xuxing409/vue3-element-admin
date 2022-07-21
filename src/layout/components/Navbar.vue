<template>
  <div class="navbar">
    <!-- 折叠按钮 -->
    <hamburger />
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect" />
      <screenfull class="right-menu-item hover-effect" />
      <theme-select id="guide-theme" class="right-menu-item hover-effect" />
      <lang-select class="right-menu-item hover-effect" />

      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- userInfo.avatar -->
          <el-avatar
            style="background: none"
            shape="square"
            :size="40"
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          >
          </el-avatar>
          <el-icon><Tools /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <!-- 项目地址 -->
            <a
              target="__blank"
              href="https://github.com/xuxing409/vue3-element-admin"
            >
              <el-dropdown-item>{{
                $t('msg.navBar.projectAddress')
              }}</el-dropdown-item>
            </a>
            <!-- 云音乐地址 -->
            <a
              target="__blank"
              href="https://cloud-web-music.vercel.app/#/discover/recommend"
            >
              <el-dropdown-item divided>{{
                $t('msg.navBar.cloudMusic')
              }}</el-dropdown-item>
            </a>
            <!-- jira任务管理系统地址 -->
            <a target="__blank" href="https://xuxing409.github.io/projects">
              <el-dropdown-item>{{ $t('msg.navBar.jira') }}</el-dropdown-item>
            </a>
            <!-- 蘑菇街项目地址 -->
            <a
              target="__blank"
              href="https://supermall-eight.vercel.app/#/home"
            >
              <el-dropdown-item>{{
                $t('msg.navBar.superMall')
              }}</el-dropdown-item>
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
// import { storeToRefs } from 'pinia'
import appStore from '@/stores'
// const { userInfo } = storeToRefs(appStore.useUserStore)
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
