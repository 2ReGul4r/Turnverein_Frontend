import { shallowMount } from "@vue/test-utils";
import TrainerCreatePopup from "../../../../src/components/PopUps/TrainerCreatePopup.vue";
import { describe, expect, test } from "vitest";

describe("TrainerCreatePopup.vue", () => {
  test("should render TrainerCreatePopup", () => {
    const wrapper = shallowMount(TrainerCreatePopup, {
      props: {
        page: 1,
      },
    });
    expect(
      wrapper.find('[data-testid="trainer_create_popup-dialog"]').exists()
    ).toBe(true);
  });
});
