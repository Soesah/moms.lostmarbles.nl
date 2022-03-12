interface ToolbarItem {
  label: string;
  icon: string;
  command: string;
  showLabel?: boolean;
  children?: ToolbarItem[];
  dynamicChildren?: boolean;
}

interface ToolbarGroup {
  name: string;
  items: ToolbarItem[];
}

export interface ToolbarConfig {
  [index: number]: ToolbarGroup;
}

export const toolbarConfig: ToolbarConfig = [
  {
    name: 'Editor',
    items: [
      {
        label: 'Save',
        command: 'save',
        icon: 'unarchive',
      },
      {
        label: 'Settings',
        command: 'showSettings',
        icon: 'settings',
      },
    ],
  },
  {
    name: 'Element',
    items: [
      {
        label: 'Add',
        command: 'ShowAddMenu',
        icon: 'add',
        dynamicChildren: true,
      },
      {
        label: 'Remove',
        command: 'removeNode',
        icon: 'remove',
        dynamicChildren: true,
      },
    ],
  },
  {
    name: 'Formatting',
    items: [
      {
        label: 'Emphasis',
        command: 'insertEmphasis',
        icon: 'format_bold',
      },
      {
        label: 'Italic',
        command: 'insertItalic',
        icon: 'format_italic',
      },
      {
        label: 'Underline',
        command: 'insertUnderline',
        icon: 'format_underlined',
      },
      {
        label: 'Add image',
        command: 'addImage',
        icon: 'format_insert_image',
      },
    ],
  },
  {
    name: 'Move',
    items: [
      {
        label: 'Move up',
        command: 'moveUp',
        icon: 'chevron_up',
        dynamicChildren: true,
      },
      {
        label: 'Move down',
        command: 'moveDown',
        icon: 'chevron_down',
        dynamicChildren: true,
      },
    ],
  },
];

export const nodeToolbarConfig: ToolbarConfig = [
  {
    name: 'Move',
    items: [
      {
        label: 'Move up',
        command: 'moveUp',
        icon: 'chevron_up',
      },
      {
        label: 'Move down',
        command: 'moveDown',
        icon: 'chevron_down',
      },
    ],
  },
  {
    name: 'Element',
    items: [
      {
        label: 'Remove',
        command: 'removeNode',
        icon: 'remove',
      },
    ],
  },
];
