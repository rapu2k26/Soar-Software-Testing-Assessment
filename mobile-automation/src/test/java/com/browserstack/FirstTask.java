package com.browserstack;
import java.time.Duration;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumBy;


public class FirstTask extends AppiumTest {

	@Test
	public void firsttest() throws Exception {

		driver.findElement(AppiumBy.androidUIAutomator(
				"new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(2)"));

		WebElement myList = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("My lists")));

		myList.click();
		Thread.sleep(3000);
		WebElement history = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("History")));

		history.click();
		Thread.sleep(3000);
		WebElement nearBy = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Nearby")));

		nearBy.click();
		Thread.sleep(3000);

		WebElement explore = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Explore")));

		explore.click();
		
		driver.findElement(AppiumBy.androidUIAutomator(
				"new UiScrollable(new UiSelector().scrollable(true)).flingToBeginning(1)"));
		
		
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
		wait.until(ExpectedConditions.visibilityOfElementLocated(AppiumBy.id("org.wikipedia.alpha:id/view_card_header_title")));
	
		
	}
}

