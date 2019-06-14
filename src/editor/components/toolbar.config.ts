interface ToolbarItem {
  label: string;
  icon: string;
  command: string;
  showLabel?: boolean;
}

interface ToolbarGroup {
  name: string;
  items: ToolbarItem[];
}

interface ToolbarConfig {
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
    ],
  },
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
        label: 'Add',
        command: 'ShowAddMenu',
        icon: 'add',
      },
      {
        label: 'Remove',
        command: 'removeNode',
        icon: 'remove',
      },
      {
        label: 'Add image',
        command: 'addImage',
        icon: 'format_insert_image',
      },
    ],
  },
];
