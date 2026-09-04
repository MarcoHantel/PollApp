import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryDropdownService {

  
  isOpen = false;
  selected = 'Sort by categories';
  choose = 'Choose categorie';

categoryOptions = [
  { value: 'all', label: 'All Surveys' },
  { value: 'Team Activities', label: 'Team Activities' },       
  { value: 'Health & Wellness', label: 'Health & Wellness' },
  { value: 'Gaming & Entertainment', label: 'Gaming & Entertainment' },
  { value: 'Education & Learning', label: 'Education & Learning' },
  { value: 'Lifestyle & Preferences', label: 'Lifestyle & Preferences' },
  { value: 'Technology & Innovation', label: 'Technology & Innovation' }
]

  selectOption(option: { value: string; label: string }) {
    this.selected = option.label;
    this.choose = option.label;
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}