import { shallowMount } from "@vue/test-utils";
import DeleteTrainerPopup from "../../../../src/components/PopUps/DeleteTrainerPopup.vue";
import { describe, expect, test } from "vitest";
import TrainerMock from "../../../mocks/TrainerMock.json";

describe("DeleteTrainerPopup.vue", () => {
  test("should render DeleteTrainerPopup", () => {
    const wrapper = shallowMount(DeleteTrainerPopup, {
      props: {
        trainer: TrainerMock,
        page: 1,
      },
    });
    expect(wrapper.find('[data-testid="delete_trainer_popup-dialog"]').exists()).toBe(
      true
    );
  });
});
