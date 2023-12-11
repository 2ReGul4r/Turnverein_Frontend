import { shallowMount } from "@vue/test-utils";
import RemoveMemberPopup from "../../../../src/components/PopUps/RemoveMemberPopup.vue";
import { describe, expect, test } from "vitest";
import ParticipantsMock from "../../../mocks/ParticipantsMock.json";

describe("RemoveMemberPopup.vue", () => {
  test("should render RemoveMemberPopup", () => {
    const wrapper = shallowMount(RemoveMemberPopup, {
      props: {
        item: ParticipantsMock['data'][0],
        title: 'Tennis',
      },
    });
    expect(
      wrapper.find('[data-testid="remove_member_popup-dialog"]').exists()
    ).toBe(true);
  });
});
