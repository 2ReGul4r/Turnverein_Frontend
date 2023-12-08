import { shallowMount } from "@vue/test-utils";
import ProfileEditCardVue from "../../../../src/components/Cards/ProfileEditCard.vue";
import { describe, expect, test } from "vitest";
import TrainerMock from "../../../mocks/TrainerMock.json";
import { createTestingPinia } from "@pinia/testing";

describe("ProfileEditCardVue.vue", () => {
  const wrapper = shallowMount(ProfileEditCardVue, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            user: { userData: TrainerMock },
          },
        }),
      ],
    },
  });
  test("should render ProfileEditCardVue", () => {
    expect(
      wrapper.find('[data-testid="profile_edit_card-wrapper"]').exists()
    ).toBe(true);
    expect(
      wrapper.find('[data-testid="profile_edit_card-profile"]').exists()
    ).toBe(true);
    expect(
      wrapper.find('[data-testid="profile_edit_card-password"]').exists()
    ).toBe(true);
  });
});
