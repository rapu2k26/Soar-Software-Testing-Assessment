package com.browserstack;


import java.time.Duration;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumBy;


public class ThirdTask extends AppiumTest {

	@Test
	public void thirdTest() throws Exception {
		WebElement moreIcon = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.id("org.wikipedia.alpha:id/menu_overflow_button")));

		moreIcon.click();

		WebElement settings = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.id("org.wikipedia.alpha:id/explore_overflow_settings")));

		settings.click();


		WebElement toggle = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.id("org.wikipedia.alpha:id/switchWidget")));

		toggle.click();


		WebElement previews = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.xpath("//android.widget.TextView[@text='Show link previews']")));

		previews.click();
		WebElement usagereports = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.xpath("//android.widget.TextView[@text='Send usage reports']")));
		usagereports.click();
		WebElement crashreports = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.xpath("//android.widget.TextView[@text='Send crash reports']")));



		crashreports.click();



		WebElement backArrow = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.className("android.widget.ImageButton")));

		backArrow.click();


		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
		wait.until(ExpectedConditions.visibilityOfElementLocated(AppiumBy.id("org.wikipedia.alpha:id/single_fragment_toolbar_wordmark")));
	}
}

