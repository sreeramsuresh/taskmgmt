import React, { useState } from "react";
import styled from "styled-components";
import {
  Save,
  User,
  Bell,
  Lock,
  Moon,
  Sun,
  Shield,
  Key,
  Upload,
  Smartphone,
  AtSign,
  Calendar,
  MapPin,
  Phone,
  Edit3,
} from "lucide-react";

const SettingsContainer = styled.div`
  padding: 1.5rem;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SettingsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const SettingsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 16rem 1fr;
  }
`;

const SettingsSidebar = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-left: 3px solid
    ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  background-color: ${(props) => (props.$active ? "#f1f5f9" : "white")};

  &:hover {
    background-color: #f1f5f9;
  }

  svg {
    color: ${(props) => (props.$active ? "#3b82f6" : "#64748b")};
    margin-right: 0.75rem;
  }

  span {
    font-weight: ${(props) => (props.$active ? "600" : "normal")};
    color: ${(props) => (props.$active ? "#1e293b" : "#64748b")};
  }
`;

const SettingsContent = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;

  @media (min-width: 768px) {
    width: 10rem;
    margin-bottom: 0;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  width: 100%;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  width: 100%;
  min-height: 5rem;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  width: 100%;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

const Toggle = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 1.5rem;
    background-color: ${(props) => (props.checked ? "#3b82f6" : "#e2e8f0")};
    border-radius: 9999px;
    transition: all 0.3s;
  }

  .toggle-switch::after {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: ${(props) => (props.checked ? "1.75rem" : "0.25rem")};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: white;
    transition: all 0.3s;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ProfileImage = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  margin-right: 2rem;

  .profile-pic {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #64748b;
  }

  .upload-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #3b82f6;
    color: white;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .role {
    color: #64748b;
    margin-bottom: 1rem;
  }

  .stats {
    display: flex;
    gap: 2rem;

    .stat {
      .value {
        font-size: 1.25rem;
        font-weight: 600;
      }

      .label {
        font-size: 0.875rem;
        color: #64748b;
      }
    }
  }
`;

const Card = styled.div`
  background-color: #f8fafc;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const SecurityCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  margin-bottom: 1rem;

  .icon {
    margin-right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #dbeafe;
    color: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    flex: 1;

    h4 {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    p {
      color: #64748b;
      font-size: 0.875rem;
    }
  }

  .action {
    button {
      background-color: #f1f5f9;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        background-color: #e2e8f0;
      }
    }
  }
`;

const ActivityLog = styled.div`
  .log-item {
    display: flex;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    .icon {
      margin-right: 0.75rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #dbeafe;
      color: #3b82f6;
    }

    .content {
      flex: 1;

      .description {
        margin-bottom: 0.25rem;
      }

      .time {
        font-size: 0.75rem;
        color: #64748b;
      }
    }
  }
`;

function Settings({ currentUser }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, 400001",
    birthday: "1985-06-15",
    bio: "CA with over 10 years of experience in audit and tax services.",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    recoveryEmail: currentUser?.email || "",
    lastPasswordChange: "2025-01-15",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    desktop: true,
    mobile: false,
    taskAssignments: true,
    clientUpdates: true,
    systemUpdates: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: false,
    sidebarCompact: false,
    colorTheme: "blue",
    fontSize: "medium",
    dashboardLayout: "default",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const renderProfileSettings = () => (
    <>
      <ProfileHeader>
        <ProfileImage>
          <div className="profile-pic">{profileForm.name.charAt(0)}</div>
          <div className="upload-overlay">
            <Upload size={16} />
          </div>
        </ProfileImage>

        <ProfileInfo>
          <h3>{profileForm.name}</h3>
          <div className="role">{currentUser?.role}</div>

          <div className="stats">
            <div className="stat">
              <div className="value">28</div>
              <div className="label">Hours this week</div>
            </div>
            <div className="stat">
              <div className="value">5</div>
              <div className="label">Active tasks</div>
            </div>
            <div className="stat">
              <div className="value">3</div>
              <div className="label">Engagements</div>
            </div>
          </div>
        </ProfileInfo>
      </ProfileHeader>

      <SectionTitle>Personal Information</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={profileForm.name}
            onChange={handleProfileChange}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="email">Email</Label>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <AtSign
              size={16}
              style={{ marginRight: "0.5rem", color: "#64748b" }}
            />
            <Input
              type="email"
              id="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
            />
          </div>
        </FormRow>
        <FormRow>
          <Label htmlFor="phone">Phone</Label>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Phone
              size={16}
              style={{ marginRight: "0.5rem", color: "#64748b" }}
            />
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={profileForm.phone}
              onChange={handleProfileChange}
            />
          </div>
        </FormRow>
        <FormRow>
          <Label htmlFor="birthday">Birthday</Label>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Calendar
              size={16}
              style={{ marginRight: "0.5rem", color: "#64748b" }}
            />
            <Input
              type="date"
              id="birthday"
              name="birthday"
              value={profileForm.birthday}
              onChange={handleProfileChange}
            />
          </div>
        </FormRow>
        <FormRow>
          <Label htmlFor="address">Address</Label>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <MapPin
              size={16}
              style={{ marginRight: "0.5rem", color: "#64748b" }}
            />
            <Input
              type="text"
              id="address"
              name="address"
              value={profileForm.address}
              onChange={handleProfileChange}
            />
          </div>
        </FormRow>
      </FormGroup>

      <SectionTitle>Professional Information</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label htmlFor="role">Role</Label>
          <Input
            type="text"
            id="role"
            name="role"
            value={currentUser?.role}
            readOnly
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="bio">Bio</Label>
          <TextArea
            id="bio"
            name="bio"
            value={profileForm.bio}
            onChange={handleProfileChange}
          />
        </FormRow>
      </FormGroup>

      <Card>
        <SectionTitle style={{ borderBottom: "none", marginBottom: "0.5rem" }}>
          Recent Activity
        </SectionTitle>
        <ActivityLog>
          <div className="log-item">
            <div className="icon">
              <Edit3 size={16} />
            </div>
            <div className="content">
              <div className="description">
                Updated GST Audit for Reliance Industries
              </div>
              <div className="time">Today at 10:30 AM</div>
            </div>
          </div>
          <div className="log-item">
            <div className="icon">
              <Lock size={16} />
            </div>
            <div className="content">
              <div className="description">Changed password</div>
              <div className="time">Yesterday at 4:15 PM</div>
            </div>
          </div>
          <div className="log-item">
            <div className="icon">
              <Edit3 size={16} />
            </div>
            <div className="content">
              <div className="description">
                Submitted timesheet for week #14
              </div>
              <div className="time">April 07, 2025 at 6:00 PM</div>
            </div>
          </div>
        </ActivityLog>
      </Card>
    </>
  );

  const renderSecuritySettings = () => (
    <>
      <SectionTitle>Account Security</SectionTitle>

      <SecurityCard>
        <div className="icon">
          <Key size={20} />
        </div>
        <div className="content">
          <h4>Password</h4>
          <p>Last changed on {securitySettings.lastPasswordChange}</p>
        </div>
        <div className="action">
          <button>Change Password</button>
        </div>
      </SecurityCard>

      <SecurityCard>
        <div className="icon">
          <Smartphone size={20} />
        </div>
        <div className="content">
          <h4>Two-Factor Authentication</h4>
          <p>{securitySettings.twoFactor ? "Enabled" : "Not enabled"}</p>
        </div>
        <div className="action">
          <button>{securitySettings.twoFactor ? "Disable" : "Enable"}</button>
        </div>
      </SecurityCard>

      <SecurityCard>
        <div className="icon">
          <Shield size={20} />
        </div>
        <div className="content">
          <h4>Recovery Email</h4>
          <p>{securitySettings.recoveryEmail}</p>
        </div>
        <div className="action">
          <button>Update</button>
        </div>
      </SecurityCard>

      <SectionTitle>Login Sessions</SectionTitle>
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h4 style={{ fontWeight: "600" }}>Current Session</h4>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
              Mumbai, India - Chrome on Windows
            </p>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.5rem",
              backgroundColor: "#dcfce7",
              color: "#166534",
              borderRadius: "9999px",
            }}
          >
            Active Now
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h4 style={{ fontWeight: "600" }}>Mobile App</h4>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
              iPhone 15 Pro - Mumbai, India
            </p>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.5rem",
              backgroundColor: "#f3e8ff",
              color: "#6b21a8",
              borderRadius: "9999px",
            }}
          >
            2 hours ago
          </span>
        </div>

        <button
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            marginTop: "1rem",
            cursor: "pointer",
          }}
        >
          Sign Out All Devices
        </button>
      </Card>

      <SectionTitle>Account Activity</SectionTitle>
      <ActivityLog>
        <div className="log-item">
          <div className="icon">
            <Lock size={16} />
          </div>
          <div className="content">
            <div className="description">Password changed</div>
            <div className="time">January 15, 2025 at 11:30 AM</div>
          </div>
        </div>
        <div className="log-item">
          <div className="icon">
            <User size={16} />
          </div>
          <div className="content">
            <div className="description">Profile information updated</div>
            <div className="time">December 10, 2024 at 2:45 PM</div>
          </div>
        </div>
        <div className="log-item">
          <div className="icon">
            <Lock size={16} />
          </div>
          <div className="content">
            <div className="description">Successful login from new device</div>
            <div className="time">December 5, 2024 at 9:15 AM</div>
          </div>
        </div>
      </ActivityLog>
    </>
  );

  const renderNotificationSettings = () => (
    <>
      <SectionTitle>Notification Channels</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label>Email Notifications</Label>
          <Toggle
            checked={notificationSettings.email}
            onClick={() =>
              setNotificationSettings({
                ...notificationSettings,
                email: !notificationSettings.email,
              })
            }
          >
            <div className="toggle-switch"></div>
          </Toggle>
        </FormRow>
        <FormRow>
          <Label>Desktop Notifications</Label>
          <Toggle
            checked={notificationSettings.desktop}
            onClick={() =>
              setNotificationSettings({
                ...notificationSettings,
                desktop: !notificationSettings.desktop,
              })
            }
          >
            <div className="toggle-switch"></div>
          </Toggle>
        </FormRow>
        <FormRow>
          <Label>Mobile Push Notifications</Label>
          <Toggle
            checked={notificationSettings.mobile}
            onClick={() =>
              setNotificationSettings({
                ...notificationSettings,
                mobile: !notificationSettings.mobile,
              })
            }
          >
            <div className="toggle-switch"></div>
          </Toggle>
        </FormRow>
      </FormGroup>

      <SectionTitle>Notification Types</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label>Task Assignments</Label>
          <Toggle
            checked={notificationSettings.taskAssignments}
            onClick={() =>
              setNotificationSettings({
                ...notificationSettings,
                taskAssignments: !notificationSettings.taskAssignments,
              })
            }
          >
            <div className="toggle-switch"></div>
          </Toggle>
        </FormRow>
        <FormRow>
          <Label>Client Updates</Label>
          <Toggle
            checked={notificationSettings.clientUpdates}
            onClick={() =>
              setNotificationSettings({
                ...notificationSettings,
                clientUpdates: !notificationSettings.clientUpdates,
              })
            }
          >
            <div className="toggle-switch"></div>
          </Toggle>
        </FormRow>
        <FormRow>
          <Label>System Updates</Label>
          <Toggle
            checked={notificationSettings.systemUpdates}
            onClick={() =>
              setNotificationSettings({
                ...notificationSettings,
                systemUpdates: !notificationSettings.systemUpdates,
              })
            }
          >
            <div className="toggle-switch"></div>
          </Toggle>
        </FormRow>
      </FormGroup>

      <SectionTitle>Notification Schedule</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label>Quiet Hours</Label>
          <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
            <Input type="time" defaultValue="20:00" style={{ width: "8rem" }} />
            <span style={{ margin: "0 0.5rem" }}>to</span>
            <Input type="time" defaultValue="08:00" style={{ width: "8rem" }} />
          </div>
        </FormRow>
      </FormGroup>
    </>
  );

  const renderAppearanceSettings = () => (
    <>
      <SectionTitle>Theme</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label>Dark Mode</Label>
          <Toggle
            checked={appearanceSettings.darkMode}
            onClick={() =>
              setAppearanceSettings({
                ...appearanceSettings,
                darkMode: !appearanceSettings.darkMode,
              })
            }
          >
            <div className="toggle-switch"></div>
          </Toggle>
        </FormRow>
      </FormGroup>

      <SectionTitle>Color Theme</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label>Theme Color</Label>
          <Select
            value={appearanceSettings.colorTheme}
            onChange={(e) =>
              setAppearanceSettings({
                ...appearanceSettings,
                colorTheme: e.target.value,
              })
            }
          >
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="green">Green</option>
            <option value="indigo">Indigo</option>
          </Select>
        </FormRow>
      </FormGroup>

      <SectionTitle>Text Size</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label>Font Size</Label>
          <Select
            value={appearanceSettings.fontSize}
            onChange={(e) =>
              setAppearanceSettings({
                ...appearanceSettings,
                fontSize: e.target.value,
              })
            }
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
        </FormRow>
      </FormGroup>

      <SectionTitle>Dashboard Layout</SectionTitle>
      <FormGroup>
        <FormRow>
          <Label>Layout Style</Label>
          <Select
            value={appearanceSettings.dashboardLayout}
            onChange={(e) =>
              setAppearanceSettings({
                ...appearanceSettings,
                dashboardLayout: e.target.value,
              })
            }
          >
            <option value="default">Default</option>
            <option value="compact">Compact</option>
          </Select>
        </FormRow>
      </FormGroup>
    </>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings();
      case "security":
        return renderSecuritySettings();
      case "notifications":
        return renderNotificationSettings();
      case "appearance":
        return renderAppearanceSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <SettingsTitle>Settings</SettingsTitle>
        <SaveButton>
          <Save size={16} />
          Save Changes
        </SaveButton>
      </SettingsHeader>

      <SettingsLayout>
        <SettingsSidebar>
          <SidebarItem
            $active={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          >
            <User size={20} />
            <span>Profile</span>
          </SidebarItem>
          <SidebarItem
            $active={activeSection === "security"}
            onClick={() => setActiveSection("security")}
          >
            <Lock size={20} />
            <span>Security</span>
          </SidebarItem>
          <SidebarItem
            $active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
          >
            <Bell size={20} />
            <span>Notifications</span>
          </SidebarItem>
          <SidebarItem
            $active={activeSection === "appearance"}
            onClick={() => setActiveSection("appearance")}
          >
            <Sun size={20} />
            <span>Appearance</span>
          </SidebarItem>
        </SettingsSidebar>

        <SettingsContent>{renderContent()}</SettingsContent>
      </SettingsLayout>
    </SettingsContainer>
  );
}

export default Settings;
