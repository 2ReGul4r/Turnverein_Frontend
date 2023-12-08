import { shallowMount } from "@vue/test-utils";
import TrainerCardVue from "../../../../src/components/Cards/TrainerCard.vue";
import { describe, expect, test } from "vitest";
import TrainerMock from "../../../mocks/TrainerMock.json";

describe("TrainerCard.vue", () => {
  test("should render TrainerCard", () => {
    const wrapper = shallowMount(TrainerCardVue, {
      props: {
        trainer: TrainerMock,
        page: 1,
      },
    });
    expect(wrapper.find('[data-testid="trainer_card-wrapper"]').exists()).toBe(
      true
    );
    expect(wrapper.attributes("title")).toBe(`${TrainerMock.first_name} ${TrainerMock.last_name}`);
    expect(wrapper.attributes("subtitle")).toBe(TrainerMock.username);
  });

  test("should get correct title", () => {
    const trainer = { trainer: TrainerMock };
    expect(TrainerCardVue.computed?.getTitle.call(trainer)).toBe(`${TrainerMock.first_name} ${TrainerMock.last_name}`);
  });

  test("should get correct birthday", () => {
    const trainer = { trainer: TrainerMock };
    expect(TrainerCardVue.computed?.getBirthday.call(trainer)).toBe("12/17/1997");
  });
});
