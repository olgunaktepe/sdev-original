import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { Select2 } from 'ng-select2-component'
import { options } from './data'
import { SelectizeDirective } from '@core/directive/selectize.directive'
import { UiSwitchModule } from 'ngx-ui-switch'

@Component({
  selector: 'app-advanced',
  standalone: true,
  imports: [
    PageTitleComponent,
    Select2,
    SelectizeDirective,
    UiSwitchModule,
  ],
  templateUrl: './advanced.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvancedComponent {
  breadCrumbItems = [
    { label: 'Forms', path: '/forms/advanced' },
    { label: 'Form Advanced', path: '/forms/advanced', active: true },
  ]

  items = options

  selectizeTagsOptions = {
    persist: false,
    createOnBlur: true,
    create: true,
  }

  selectizeSelectOptions = {
    create: true,
    sortField: {
      field: 'text',
      direction: 'asc',
    },
    dropdownParent: 'body',
  }

  selectizeMaximumOptions = {
    maxItems: 3,
  }

  selectizeLinksOptions = {
    theme: 'links',
    maxItems: null,
    valueField: 'id',
    searchField: 'title',
    options: [
      { id: 1, title: 'Coderthemes', url: 'https://coderthemes.com/' },
      { id: 2, title: 'Google', url: 'http://google.com' },
      { id: 3, title: 'Yahoo', url: 'http://yahoo.com' },
    ],
    render: {
      option: function (data: any, escape: any) {
        return (
          '<div class="option"><span class="title">' +
          escape(data.title) +
          '</span><span class="url">' +
          escape(data.url) +
          '</span></div>'
        )
      },
      item: function (data: any, escape: any) {
        return (
          '<div class="item"><a href="' +
          escape(data.url) +
          '">' +
          escape(data.title) +
          '</a></div>'
        )
      },
    },
    create: function (input: any) {
      return { id: 0, title: input, url: '#' }
    },
  }

  selectizeConfirmOptions = {
    delimiter: ',',
    persist: false,
    onDelete: function (values: any) {
      return confirm(
        values.length > 1
          ? `Are you sure you want to remove these ${values.length} items?`
          : `Are you sure you want to remove "${values[0]}"?`
      )
    },
  }

  selectizeOptgroupOptions = {
    sortField: 'text',
  }

  selectizeProgrammaticOptions = {
    options: [
      { class: 'mammal', value: 'dog', name: 'Dog' },
      { class: 'mammal', value: 'cat', name: 'Cat' },
      { class: 'mammal', value: 'horse', name: 'Horse' },
      { class: 'bird', value: 'duck', name: 'Duck' },
      { class: 'bird', value: 'chicken', name: 'Chicken' },
    ],
    optgroups: [
      { value: 'mammal', label: 'Mammal', label_scientific: 'Mammalia' },
      { value: 'bird', label: 'Bird', label_scientific: 'Aves' },
    ],
    optgroupField: 'class',
    labelField: 'name',
    searchField: ['name'],
    render: {
      optgroup_header: function (data: any, escape: any) {
        return (
          '<div class="optgroup-header">' +
          escape(data.label) +
          ' <span class="scientific">(' +
          escape(data.label_scientific) +
          ')</span></div>'
        )
      },
    },
  }

  selectizeOptgroupColumnOptions = {
    options: [
      { id: 'avenger', make: 'dodge', model: 'Avenger' },
      { id: 'a3', make: 'audi', model: 'A3' },
    ],
    optgroups: [
      { $order: 3, id: 'dodge', name: 'Dodge' },
      { $order: 2, id: 'audi', name: 'Audi' },
    ],
    labelField: 'model',
    valueField: 'id',
    optgroupField: 'make',
    optgroupLabelField: 'name',
    optgroupValueField: 'id',
    lockOptgroupOrder: true,
    searchField: ['model'],
    plugins: ['optgroup_columns'],
    openOnFocus: false,
  }

  selectizeCloseBtnOptions = {
    plugins: ['remove_button'],
    persist: false,
    create: true,
    render: {
      item: function (data: any, escape: any) {
        return '<div>"' + escape(data.text) + '"</div>'
      },
    },
    onDelete: function (values: any) {
      return confirm(
        values.length > 1
          ? `Are you sure you want to remove these ${values.length} items?`
          : `Are you sure you want to remove "${values[0]}"?`
      )
    },
  }

  selectizeDropHeaderOptions = {
    sortField: 'text',
    hideSelected: false,
    plugins: {
      dropdown_header: { title: 'Language' },
    },
  }
}
