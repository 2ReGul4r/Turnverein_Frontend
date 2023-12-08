import { shallowMount } from "@vue/test-utils";
import CourseCardVue from "../../../../src/components/Cards/CourseCard.vue";
import { describe, expect, test } from "vitest";
import CourseMock from "../../../mocks/CourseMock.json";
import ParticipantsMock from "../../../mocks/ParticipantsMock.json";

describe("CourseCard.vue", () => {
  test("should render CourseCard", () => {
    const wrapper = shallowMount(CourseCardVue, {
      props: {
        ...CourseMock,
        page: 1,
        hideActions: false,
        hideEdit: false,
      },
    });
    expect(wrapper.find('[data-testid="course_card-wrapper"]').exists()).toBe(
      true
    );
    expect(wrapper.attributes("title")).toBe(CourseMock.sport.name);
    expect(wrapper.attributes("subtitle")).toBe(
      `with ${CourseMock.trainer.full_name}`
    );
  });

  test("should get correct days", () => {
    const date = { date: CourseMock["date"] };
    expect(CourseCardVue.computed?.getDateDays.call(date)).toEqual([
      "Wednesday",
    ]);
  });

  test("should get a not empty MemberList", () => {
    const participants = { memberList: ParticipantsMock["data"] };
    expect(CourseCardVue.computed?.isEmptyMemberList.call(participants)).toBe(
      false
    );
  });

  test("should get empty MemberList", () => {
    const participants = { memberList: [] };
    expect(CourseCardVue.computed?.isEmptyMemberList.call(participants)).toBe(
      true
    );
  });
});
