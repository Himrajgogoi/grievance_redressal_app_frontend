import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import TitleComponent from "../components/title";

function aboutTheApp() {
  return (
    <Box sx={{ m: 4, minHeight: "80vh" }}>
      <TitleComponent title="How to use" page="about"/>
      <Typography variant="body1">
        1. The app consists of three sections for different stages of the
        issues, namely
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<b>Home</b>: For all the currently posted
        issues.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<b>Accepted</b>: For all the currently accepted
        issues by the department admins.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<b>Addressed</b>: For all the resolved issues.
        <br />
        <br />
        2. For posting an issue, one needs to visit the <b>Post Issue</b> page
        and fill up the necessary details. One can even add an image of the
        issue while posting it.
        <br />
        <br />
        3. Once the issue has been succesfully posted, the home page will be
        updated to reflect your posted issue.
        <br />
        <br />
        4. When the department admin under whom the issue falls accepts your
        issue for processing or rejects it, a mail will be sent to you regarding
        the same with a brief description of the reason, if any, and
        consequently, you can know if the mail has been sent to the principal or
        not.
        <br />
        <br />
        5. Once the issue is accepted, the issue will be moved to the{" "}
        <b>accepted</b> page.
        <br />
        <br />
        6. Once the issue is addressed, a mail will be sent to you updating you
        regarding the same as well and the issue will be moved to the{" "}
        <b>addressed</b> page.
      </Typography>
      <br />
      <Divider />
      <br />
      <h3>For Department Admins,</h3>
      <Typography variant="body1">
        1. The department admins can sign In on the <b>Sign In</b> Page.
        <br />
        <br />
        2. The department admin can see the issues that has been posted only
        under his/her jurisdiction.
        <br />
        <br />
        3. The admin can <b>accept/reject</b> the posted issue. If the admin
        accepts the issue, he/she needs to provide the subject and reason for
        the subsequent email to be sent to the griever stating the current
        stance on the issue along with an estimated time frame for solving the
        issue. The admin can also decide if the email needs to be sent to the
        Principal or not however, the griever will be notified of the same.{" "}
        <br />
        If the admin rejects the issue, he/she needs to fill the same details as
        before except for the time frame.
        <br />
        <br />
        4. Once accepted, the issue will be moved to the <b>accepted</b> page.
        <br />
        <br />
        5. Once the issue has been resolved, the admin needs to update the
        resolved issue on the accepted page and again set the subject and
        content for the completion email to be sent to the griever.
        <br />
        <br />
        6. Finally the addressed issue will be moved to the <b>
          addressed
        </b>{" "}
        page.
      </Typography>
      <br />
      <Divider />
      <br />
      <Typography>
        7. For the <b>root admin</b>, two extra pages are present:
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<b>Register</b>: The root admin can register new
        department admins with an email, password and the department. issues.
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<b>All Admins</b>: The root admin can delete
        old/non-functional department admins from this page.
        <br />
        <br />
        8. The root admin can view/modify all the issue currently
        posted/accepted/addressed.
        <br />
        <br />
        9. The issues on the home page can be accepted or rejected by the root
        admin just like other department admins.
        <br />
        <br />
        10. For accepted issues, the root admin can address the issue or remove
        it. If removed, no email will be sent to the griever.
        <br />
        <br />
        11. For addressed issues, the root admin can remove old resolved issues.
      </Typography>
    </Box>
  );
}

export default aboutTheApp;
