import { shallowMount } from "@vue/test-utils";
import MemberCardVue from "../../../../src/components/Cards/MemberCard.vue";
import { describe, expect, test } from "vitest";
import MemberMock from "../../../mocks/MemberMock.json";

describe("MemberCard.vue", () => {
  test("should render MemberCard", () => {
    const wrapper = shallowMount(MemberCardVue, {
      props: {
        member: MemberMock,
        page: 1,
      },
    });
    expect(wrapper.find('[data-testid="member_card-wrapper"]').exists()).toBe(
      true
    );
    expect(wrapper.attributes("title")).toBe(MemberMock.full_name);
  });

  test("should get correct birthday", () => {
    const member = { member: MemberMock };
    expect(MemberCardVue.computed?.getBirthday.call(member)).toBe("12/30/1990");
  });
});
