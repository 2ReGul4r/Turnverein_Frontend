import { shallowMount } from "@vue/test-utils";
import DeleteMemberPopup from "../../../../src/components/PopUps/DeleteMemberPopup.vue";
import { describe, expect, test } from "vitest";
import MemberMock from "../../../mocks/MemberMock.json";

describe("DeleteMemberPopup.vue", () => {
    test("should render DeleteMemberPopup", () => {
        const wrapper = shallowMount(DeleteMemberPopup, {
            props: {
                member: MemberMock,
                searchText: "",
                page: 1,
            },
        });
        expect(wrapper.find('[data-testid="delete_member_popup-dialog"]').exists()).toBe(
            true
        );
    });
});
