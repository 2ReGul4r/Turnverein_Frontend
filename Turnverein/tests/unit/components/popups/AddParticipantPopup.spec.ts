import { shallowMount } from "@vue/test-utils";
import AddParticipantPopup from "../../../../src/components/PopUps/AddParticipantPopup.vue";
import { describe, expect, test } from "vitest";
import ParticipantsMock from "../../../mocks/ParticipantsMock.json";

describe("AddParticipantPopup.vue", () => {
  test("should render AddParticipantPopup", () => {
    const wrapper = shallowMount(AddParticipantPopup, {
      props: {
        ...ParticipantsMock,
        courseId: 1,
      },
    });
    expect(wrapper.find('[data-testid="participant_popup-dialog"]').exists()).toBe(
      true
    );
  });
});
