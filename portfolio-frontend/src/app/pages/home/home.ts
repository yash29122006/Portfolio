import { Component } from '@angular/core';

import { Navbar } from '../../shared/components/navbar/navbar';

import { Hero } from './hero/hero';
import { About } from './about/about';
import { Academics } from './academics/academics';
import { Projects } from './projects/projects';
import { Skills } from './skills/skills';
import { Achievements } from './achievements/achievements';
import { Certifications } from './certifications/certifications';
import { Experience } from './experience/experience';
import { Contact } from './contact/contact';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    Hero,
    About,
    Academics,
    Projects,
    Skills,
    Achievements,
    Certifications,
    Experience,
    Contact,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}