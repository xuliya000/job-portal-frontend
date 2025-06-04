import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule, FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import { JobService, Job } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})


export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  filterForm: FormGroup;
  sortOption: string = 'date-desc'; 
  uniqueCompanies: string[] = [];
  companyFilterOpen = false;


  constructor(private jobService: JobService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      search: [''],
      type: [''],
      experienceLevel: [''],
      salaryMin: [''],
      salaryMax: [''],
      companies: [[]],
    });
  }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
        this.filteredJobs = data; 
        this.uniqueCompanies = [...new Set(data.map(job => job.companyName).filter(name => !!name))].sort();
        this.sortJobs(); 
      },
      error: (err) => console.error('Failed to load jobs:', err),
    });
  }

  applyFilter() {
    const search = this.filterForm.value.search?.toLowerCase().trim() || '';
    const { type, experienceLevel, salaryMin, salaryMax, companies } = this.filterForm.value;

    const searchWords = search.split(/\s+/).filter((word: string) => word.length > 0);

    this.filteredJobs = this.jobs.filter(job => {
      // On convertit les champs en minuscules pour comparaison insensible à la casse
      const title = job.title.toLowerCase();
      const location = job.location.toLowerCase();

      // Vérifier que chaque mot est dans le titre ou dans le lieu
      const allWordsMatch = searchWords.every((word: string) =>
        title.includes(word) || location.includes(word)
      );

      const matchesType = type ? job.type === type : true;
      const matchesExperience = experienceLevel ? job.experienceLevel === experienceLevel : true;
      const matchesSalaryMin = salaryMin ? job.salaryMin >= salaryMin : true;
      const matchesSalaryMax = salaryMax ? job.salaryMax <= salaryMax : true;

      // companies est un tableau de noms sélectionnés (en minuscules pour comparaison)
      const matchesCompany = companies && companies.length > 0 ? companies.includes(job.companyName) : true;

      return allWordsMatch && matchesType && matchesExperience && matchesSalaryMin && matchesSalaryMax && matchesCompany;
    });

  }


  resetFilters(): void {
    this.filterForm.reset({
      search: '',
      type: '',
      experienceLevel: '',
      salaryMin: '',
      salaryMax: '',
      companies: []
    });

    this.companyFilterOpen = false;
    this.filteredJobs = [...this.jobs];
    this.sortJobs();
  }



  sortJobs(): void {
    switch (this.sortOption) {
      case 'date-desc':
        this.filteredJobs.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        break;
      case 'date-asc':
        this.filteredJobs.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
        break;
      case 'salary-desc':
        this.filteredJobs.sort((a, b) => (b.salaryMax ?? 0) - (a.salaryMax ?? 0));
        break;
      case 'salary-asc':
        this.filteredJobs.sort((a, b) => (a.salaryMin ?? 0) - (b.salaryMin ?? 0));
        break;
    }
  }


  getTimeAgo(dateString: string | undefined): string {
    if (!dateString) return '';
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Publié il y a quelques secondes';
    if (diffMinutes < 60) return `Publié il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Publié il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    return `Publié il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }

  toggleCompanyFilter() {
    this.companyFilterOpen = !this.companyFilterOpen;
  }

  onCompanyCheckboxChange(event: any) {
    const selectedCompanies = this.filterForm.value.companies as string[];
    const company = event.target.value;
    if (event.target.checked) {
      if (!selectedCompanies.includes(company)) {
        selectedCompanies.push(company);
      }
    } else {
      const index = selectedCompanies.indexOf(company);
      if (index !== -1) {
        selectedCompanies.splice(index, 1);
      }
    }
    this.filterForm.patchValue({ companies: selectedCompanies });
  }

  closeCompanyFilter() {
    setTimeout(() => {
      this.companyFilterOpen = false;
    }, 200);
  }

  removeCompany(company: string, event: Event) {
    event.stopPropagation();
    const companies = this.filterForm.value.companies as string[];
    const index = companies.indexOf(company);
    if (index !== -1) {
      companies.splice(index, 1);
      this.filterForm.patchValue({ companies });
    }
  }



}
