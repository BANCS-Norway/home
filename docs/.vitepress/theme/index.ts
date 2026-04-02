import type {Theme} from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import {h} from 'vue';
import LayoutWithMain from './LayoutWithMain.vue';
import BlogCard from './components/BlogCard.vue';
import BlogHeading from './components/BlogHeading.vue';
import BlogIndex from './components/BlogIndex.vue';
import CustomButton from './components/CustomButton.vue';
import DisclaimerBox from './components/DisclaimerBox.vue';
import Footer from './components/Footer.vue';
import GradientCTA from './components/GradientCTA.vue';
import HeroImage from './components/HeroImage.vue';
import ImageAttribution from './components/ImageAttribution.vue';
import InfinityDivider from './components/InfinityDivider.vue';
import InfoSection from './components/InfoSection.vue';
import NotFound from './components/NotFound.vue';
import PostPreview from './components/PostPreview.vue';
import ProjectCard from './components/ProjectCard.vue';
import RevealPresentation from './components/RevealPresentation.vue';
import RevealStamp from './components/RevealStamp.vue';
import SeriesNav from './components/SeriesNav.vue';
import UpcomingPage from './components/UpcomingPage.vue';
import UpcomingPosts from './components/UpcomingPosts.vue';

import './custom.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(LayoutWithMain, null, {
      'layout-bottom': () => h(Footer),
      'not-found': () => h(NotFound),
    });
  },
  enhanceApp({app}) {
    // Register global components
    app.component('ProjectCard', ProjectCard);
    app.component('BlogCard', BlogCard);
    app.component('CustomButton', CustomButton);
    app.component('DisclaimerBox', DisclaimerBox);
    app.component('GradientCTA', GradientCTA);
    app.component('BlogHeading', BlogHeading);
    app.component('InfoSection', InfoSection);
    app.component('PostPreview', PostPreview);
    app.component('RevealStamp', RevealStamp);
    app.component('SeriesNav', SeriesNav);
    app.component('HeroImage', HeroImage);
    app.component('ImageAttribution', ImageAttribution);
    app.component('BlogIndex', BlogIndex);
    app.component('InfinityDivider', InfinityDivider);
    app.component('RevealPresentation', RevealPresentation);
    app.component('UpcomingPosts', UpcomingPosts);
    app.component('UpcomingPage', UpcomingPage);
  },
} satisfies Theme;
