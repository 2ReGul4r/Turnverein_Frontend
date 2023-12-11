import { shallowMount } from "@vue/test-utils";
import CourseCreatePopup from "../../../../src/components/PopUps/CourseCreatePopup.vue";
import { describe, expect, test } from "vitest";

describe("CourseCreatePopup.vue", () => {
  test("should render CourseCreatePopup", () => {
    const wrapper = shallowMount(CourseCreatePopup, {
      props: {
        page: 1,
      },
    });
    expect(wrapper.find('[data-testid="course_create_popup-dialog"]').exists()).toBe(
      true
    );
  });
});
