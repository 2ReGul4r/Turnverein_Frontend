import { shallowMount } from "@vue/test-utils";
import CourseEditPopup from "../../../../src/components/PopUps/CourseEditPopup.vue";
import { describe, expect, test } from "vitest";
import CourseMock from "../../../mocks/CourseMock.json";

describe("CourseEditPopup.vue", () => {
  test("should render CourseEditPopup", () => {
    const wrapper = shallowMount(CourseEditPopup, {
      props: {
        ...CourseMock,
        page: 1,
      },
    });
    expect(wrapper.find('[data-testid="course_edit_popup-dialog"]').exists()).toBe(
      true
    );
  });
});
