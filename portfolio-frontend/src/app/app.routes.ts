import { Routes } from '@angular/router';

import { Home } from './pages/home/home';

import { Login } from './pages/admin/login/login';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { AchievementsPage } from './pages/achievements-page/achievements-page';
import { CertificationsPage } from './pages/certifications-page/certifications-page';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Overview } from './pages/admin/dashboard/overview/overview';
import { Portfolio } from './pages/admin/dashboard/portfolio/portfolio';
import { Academics } from './pages/admin/dashboard/academics/academics';
import { Projects } from './pages/admin/dashboard/projects/projects';
import { Skills } from './pages/admin/dashboard/skills/skills';
import { Achievements } from './pages/admin/dashboard/achievements/achievements';
import { Certifications } from './pages/admin/dashboard/certifications/certifications';
import { ExperienceComponent } from './pages/admin/dashboard/experience/experience';
import { SocialLinksComponent } from './pages/admin/dashboard/social-links/social-links';
import { Messages } from './pages/admin/dashboard/messages/messages';

import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [

  {
    path: 'projects',
    component: ProjectsPage
  },
  {
    path: 'achievements',
    component: AchievementsPage
  },

  {
    path: 'certifications',
    component: CertificationsPage
  },

  // PUBLIC PORTFOLIO
  {
    path: '',
    component: Home
  },

  // ALL PROJECTS PAGE
  {
    path: 'projects',
    component: ProjectsPage
  },

  // ADMIN LOGIN
  {
    path: 'admin/login',
    component: Login
  },


  // PROTECTED ADMIN DASHBOARD
  {
    path: 'admin/dashboard',
    component: Dashboard,
    canActivate: [adminGuard],

    children: [

      // /admin/dashboard
      {
        path: '',
        component: Overview
      },

      // /admin/dashboard/portfolio
      {
        path: 'portfolio',
        component: Portfolio
      },

      // /admin/dashboard/academics
      {
        path: 'academics',
        component: Academics
      },

      // /admin/dashboard/projects
      {
        path: 'projects',
        component: Projects
      },

      // /admin/dashboard/skills
      {
        path: 'skills',
        component: Skills
      },

      // /admin/dashboard/achievements
      {
        path: 'achievements',
        component: Achievements
      },

      // /admin/dashboard/certifications
      {
        path: 'certifications',
        component: Certifications
      },

      // /admin/dashboard/experience
      {
        path: 'experience',
        component: ExperienceComponent
      },

      // /admin/dashboard/social-links
      {
        path: 'social-links',
        component: SocialLinksComponent
      },

      // /admin/dashboard/messages
      {
        path: 'messages',
        component: Messages
      }

    ]
  },


  // UNKNOWN ROUTES
  {
    path: '**',
    redirectTo: ''
  }

];