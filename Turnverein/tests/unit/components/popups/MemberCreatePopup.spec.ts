import { shallowMount } from "@vue/test-utils";
import MemberCreatePopup from "../../../../src/components/PopUps/MemberCreatePopup.vue";
import { describe, expect, test } from "vitest";
import MemberMock from "../../../mocks/MemberMock.json";

describe("MemberCreatePopup.vue", () => {
  test("should render MemberCreatePopup", () => {
    const wrapper = shallowMount(MemberCreatePopup, {
      props: {
        memberOriginal: MemberMock,
        page: 1,
      },
    });
    expect(wrapper.find('[data-testid="member_create_popup-dialog').exists()).toBe(
      true
    );
  });
});
