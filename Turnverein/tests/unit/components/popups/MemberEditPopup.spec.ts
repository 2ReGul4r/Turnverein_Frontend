import { shallowMount } from "@vue/test-utils";
import MemberEditPopup from "../../../../src/components/PopUps/MemberEditPopup.vue";
import { describe, expect, test } from "vitest";
import MemberMock from "../../../mocks/MemberMock.json";

describe("MemberEditPopup.vue", () => {
  test("should render MemberEditPopup", () => {
    const wrapper = shallowMount(MemberEditPopup, {
      props: {
        memberOriginal: MemberMock,
        page: 1,
      },
    });
    expect(
      wrapper.find('[data-testid="member_edit_popup-dialog"]').exists()
    ).toBe(true);
  });
});
