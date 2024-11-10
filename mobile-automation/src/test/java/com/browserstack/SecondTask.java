package com.browserstack;

import java.time.Duration;
import java.util.List;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import io.appium.java_client.AppiumBy;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.WaitOptions;

import io.appium.java_client.touch.offset.PointOption;

public class SecondTask extends AppiumTest {

	@Test
	public void secondTask() throws Exception {
		WebElement searchElement = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.accessibilityId("Search Wikipedia")));

		searchElement.click();
		WebElement insertTextElement = (WebElement) new WebDriverWait(driver, Duration.ofSeconds(30)).until(
				ExpectedConditions.elementToBeClickable(AppiumBy.id("org.wikipedia.alpha:id/search_src_text")));
		insertTextElement.sendKeys("New York");
		Thread.sleep(5000);

		List<WebElement> allProductsName = driver.findElements(AppiumBy.className("android.widget.TextView"));
		Assert.assertTrue(allProductsName.size() > 0);

		WebElement closeButton = new WebDriverWait(driver, Duration.ofSeconds(30))
				.until(ExpectedConditions.elementToBeClickable(AppiumBy.id("org.wikipedia.alpha:id/search_close_btn")));

		// Get the element's location and size for the coordinates
		int x = closeButton.getLocation().getX() + closeButton.getSize().getWidth() / 2;
		int y = closeButton.getLocation().getY() + closeButton.getSize().getHeight() / 2;

		// Perform double-tap using TouchAction at specific coordinates
		TouchAction action = new TouchAction(driver);
		action.tap(PointOption.point(x, y))  // First tap
		.waitAction(WaitOptions.waitOptions(Duration.ofMillis(100)))  // Short delay
		.tap(PointOption.point(x, y))  // Second tap
		.perform();
		
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
		wait.until(ExpectedConditions.visibilityOfElementLocated(AppiumBy.id("org.wikipedia.alpha:id/view_card_header_title")));
		
	}
}

