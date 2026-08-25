import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryDropdownService {

  isOpen = false;
  selected = 'Sort by categories';

  categoryOptions = [
    { value: 'all', label: 'All Surveys' },
    { value: 'team', label: 'Team Activities' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'gaming', label: 'Gaming & Entertainment' },
    { value: 'education', label: 'Education & Learning' },
    { value: 'lifestyle', label: 'Lifestyle & Preferences' },
    { value: 'tech', label: 'Technology & Innovation' }
  ]

  selectOption(option: { value: string; label: string }) {
    this.selected = option.label;
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}