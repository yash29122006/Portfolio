import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Portfolio } from '../../models/portfolio.model';
import { AcademicDetail } from '../../models/academic.model';
import { Project } from '../../models/project.model';
import { Skill } from '../../models/skill.model';
import { Achievement } from '../../models/achievement.model';
import { Certification } from '../../models/certification.model';
import { Experience } from '../../models/experience.model';
import { SocialLinks } from '../../models/social-links.model';
import { ContactMessage } from '../../models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private http = inject(HttpClient);

  private readonly baseUrl = 'https://portfolio-am2l.onrender.com/api';


  // =========================================================
  // PUBLIC API
  // =========================================================

  getPortfolio() {
    return this.http.get<Portfolio>(
      `${this.baseUrl}/public/portfolio`
    );
  }

  getAcademics() {
    return this.http.get<AcademicDetail[]>(
      `${this.baseUrl}/public/academics`
    );
  }

  getProjects() {
    return this.http.get<Project[]>(
      `${this.baseUrl}/public/projects`
    );
  }

  getFeaturedProjects() {
    return this.http.get<Project[]>(
      `${this.baseUrl}/public/projects/featured`
    );
  }

  getSkills() {
    return this.http.get<Skill[]>(
      `${this.baseUrl}/public/skills`
    );
  }

  getAchievements() {
    return this.http.get<Achievement[]>(
      `${this.baseUrl}/public/achievements`
    );
  }

  getFeaturedAchievements() {
    return this.http.get<Achievement[]>(
      `${this.baseUrl}/public/achievements/featured`
    );
  }

  getCertifications() {
    return this.http.get<Certification[]>(
      `${this.baseUrl}/public/certifications`
    );
  }

  getFeaturedCertifications() {
    return this.http.get<Certification[]>(
      `${this.baseUrl}/public/certifications/featured`
    );
  }

  getExperience() {
    return this.http.get<Experience[]>(
      `${this.baseUrl}/public/experience`
    );
  }

  getSocialLinks() {
    return this.http.get<SocialLinks>(
      `${this.baseUrl}/public/social-links`
    );
  }

  sendContactMessage(data: ContactMessage) {
    return this.http.post<ContactMessage>(
      `${this.baseUrl}/contact`,
      data
    );
  }


  // =========================================================
  // ADMIN - PORTFOLIO
  // =========================================================

  updatePortfolio(
    data: Pick<Portfolio, 'name' | 'summary'>
  ) {
    return this.http.put<Portfolio>(
      `${this.baseUrl}/admin/portfolio`,
      data
    );
  }


  // =========================================================
  // ADMIN - ACADEMICS
  // =========================================================

  getAdminAcademics() {
    return this.http.get<AcademicDetail[]>(
      `${this.baseUrl}/admin/academics`
    );
  }

  createAcademic(
    data: Omit<AcademicDetail, 'id'>
  ) {
    return this.http.post<AcademicDetail>(
      `${this.baseUrl}/admin/academics`,
      data
    );
  }

  updateAcademic(
    id: number,
    data: Omit<AcademicDetail, 'id'>
  ) {
    return this.http.put<AcademicDetail>(
      `${this.baseUrl}/admin/academics/${id}`,
      data
    );
  }

  deleteAcademic(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/admin/academics/${id}`
    );
  }


  // =========================================================
  // ADMIN - PROJECTS
  // =========================================================

  getAdminProjects() {
    return this.http.get<Project[]>(
      `${this.baseUrl}/admin/projects`
    );
  }

  createProject(
    data: Omit<Project, 'id'>
  ) {
    return this.http.post<Project>(
      `${this.baseUrl}/admin/projects`,
      data
    );
  }

  updateProject(
    id: number,
    data: Omit<Project, 'id'>
  ) {
    return this.http.put<Project>(
      `${this.baseUrl}/admin/projects/${id}`,
      data
    );
  }

  deleteProject(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/admin/projects/${id}`
    );
  }


  // =========================================================
  // ADMIN - SKILLS
  // =========================================================

  getAdminSkills() {
    return this.http.get<Skill[]>(
      `${this.baseUrl}/admin/skills`
    );
  }

  createSkill(
    data: Omit<Skill, 'id'>
  ) {
    return this.http.post<Skill>(
      `${this.baseUrl}/admin/skills`,
      data
    );
  }

  updateSkill(
    id: number,
    data: Omit<Skill, 'id'>
  ) {
    return this.http.put<Skill>(
      `${this.baseUrl}/admin/skills/${id}`,
      data
    );
  }

  deleteSkill(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/admin/skills/${id}`
    );
  }


  // =========================================================
  // ADMIN - ACHIEVEMENTS
  // =========================================================

  getAdminAchievements() {
    return this.http.get<Achievement[]>(
      `${this.baseUrl}/admin/achievements`
    );
  }

  createAchievement(
    data: Omit<Achievement, 'id'>
  ) {
    return this.http.post<Achievement>(
      `${this.baseUrl}/admin/achievements`,
      data
    );
  }

  updateAchievement(
    id: number,
    data: Omit<Achievement, 'id'>
  ) {
    return this.http.put<Achievement>(
      `${this.baseUrl}/admin/achievements/${id}`,
      data
    );
  }

  deleteAchievement(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/admin/achievements/${id}`
    );
  }


  // =========================================================
  // ADMIN - CERTIFICATIONS
  // =========================================================

  getAdminCertifications() {
    return this.http.get<Certification[]>(
      `${this.baseUrl}/admin/certifications`
    );
  }

  createCertification(
    data: Omit<Certification, 'id'>
  ) {
    return this.http.post<Certification>(
      `${this.baseUrl}/admin/certifications`,
      data
    );
  }

  updateCertification(
    id: number,
    data: Omit<Certification, 'id'>
  ) {
    return this.http.put<Certification>(
      `${this.baseUrl}/admin/certifications/${id}`,
      data
    );
  }

  deleteCertification(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/admin/certifications/${id}`
    );
  }


  // =========================================================
  // ADMIN - EXPERIENCE
  // =========================================================

  getAdminExperience() {
    return this.http.get<Experience[]>(
      `${this.baseUrl}/admin/experience`
    );
  }

  createExperience(
    data: Omit<Experience, 'id'>
  ) {
    return this.http.post<Experience>(
      `${this.baseUrl}/admin/experience`,
      data
    );
  }

  updateExperience(
    id: number,
    data: Omit<Experience, 'id'>
  ) {
    return this.http.put<Experience>(
      `${this.baseUrl}/admin/experience/${id}`,
      data
    );
  }

  deleteExperience(id: number) {
    return this.http.delete<void>(
      `${this.baseUrl}/admin/experience/${id}`
    );
  }


  // =========================================================
  // ADMIN - SOCIAL LINKS
  // =========================================================

  updateSocialLinks(
    data: Omit<SocialLinks, 'id'>
  ) {
    return this.http.put<SocialLinks>(
      `${this.baseUrl}/admin/social-links`,
      data
    );
  }

  // ADMIN - CONTACT MESSAGES

getAdminMessages() {
  return this.http.get<ContactMessage[]>(
    `${this.baseUrl}/admin/messages`
  );
}

deleteMessage(id: number) {
  return this.http.delete<void>(
    `${this.baseUrl}/admin/messages/${id}`
  );
}

}