import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LogoTitle from "@/components/common/LogoTitle.vue";

describe('HelloWorld', () => {
    it('renders properly', () => {
        const wrapper = mount(LogoTitle, { props: { title: 'Vault'} })
        expect(wrapper.text()).toContain('Vault')
    })
})
