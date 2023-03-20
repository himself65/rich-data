import type { Meta, StoryObj } from '@storybook/react'

import {
  CheckIcon,
  ChevronRightIcon, CircularArrowsIcon, CloseIcon, ContentCopyIcon, EditIcon,
  ExpandMoreIcon
} from '../components/Icons'

const meta: Meta = {
  title: 'Example/Icons'
}
export default meta

export const CheckIconStory: StoryObj = {
  render: () => <CheckIcon />
}

export const ChevronRightIconStory: StoryObj = {
  render: () => <ChevronRightIcon />
}

export const CircularArrowsIconStory: StoryObj = {
  render: () => <CircularArrowsIcon />
}

export const CloseIconStory: StoryObj = {
  render: () => <CloseIcon />
}

export const ContentCopyIconStory: StoryObj = {
  render: () => <ContentCopyIcon />
}

export const EditIconStory: StoryObj = {
  render: () => <EditIcon />
}

export const ExpandMoreIconStory: StoryObj = {
  render: () => <ExpandMoreIcon />
}
